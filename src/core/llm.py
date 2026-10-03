import time
import requests
from config.settings import GEMINI_API_KEY
from src.core.tools import HelmTools, GEMINI_TOOLS_SCHEMA

class MultiLLMEngine:
    def __init__(self):
        self.gemini_key = GEMINI_API_KEY
        self.tool_map = {
            "execute_shell": HelmTools.execute_shell,
            "read_file": HelmTools.read_file,
            "write_file": HelmTools.write_file,
            "list_directory": HelmTools.list_directory,
            "get_system_info": HelmTools.get_system_info,
            "send_whatsapp": HelmTools.send_whatsapp,
            "send_email": HelmTools.send_email,
            "api_http_call": HelmTools.api_http_call
        }

    def call_gemini(self, system_instruction: str, history: list, user_prompt: str) -> tuple[str, list]:
        if not self.gemini_key or self.gemini_key.startswith("votre_"):
            return "⚠️ Clé Gemini non configurée dans le fichier .env", history

        model = "gemini-2.5-flash"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.gemini_key}"
        
        prompt_text = f"{system_instruction}\n\nDirective du Propriétaire : {user_prompt}" if not history else user_prompt
        
        contents = list(history)
        contents.append({"role": "user", "parts": [{"text": prompt_text}]})

        payload = {
            "contents": contents,
            "tools": GEMINI_TOOLS_SCHEMA
        }

        max_retries = 3
        for attempt in range(max_retries):
            try:
                res = requests.post(url, json=payload, timeout=30)
                if res.status_code in [503, 429]:
                    time.sleep(4)
                    continue

                if res.status_code != 200:
                    return f"❌ Erreur HTTP {res.status_code} : {res.text}", history

                data = res.json()
                candidate_part = data["candidates"][0]["content"]["parts"][0]

                if "functionCall" in candidate_part:
                    fn_call = candidate_part["functionCall"]
                    fn_name = fn_call.get("name")
                    fn_args = fn_call.get("args", {})

                    if fn_name in self.tool_map:
                        tool_result = str(self.tool_map[fn_name](**fn_args))
                    else:
                        tool_result = f"Erreur : Outil '{fn_name}' inconnu."

                    contents.append({"role": "model", "parts": [candidate_part]})
                    contents.append({
                        "role": "function",
                        "parts": [{"functionResponse": {"name": fn_name, "response": {"result": tool_result}}}]
                    })

                    res_followup = requests.post(url, json={"contents": contents}, timeout=30)
                    if res_followup.status_code == 200:
                        final_text = res_followup.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
                        contents.append({"role": "model", "parts": [{"text": final_text}]})
                        return final_text, contents
                    
                    final_res = f"📋 [Exécution de {fn_name}] :\n{tool_result}"
                    contents.append({"role": "model", "parts": [{"text": final_res}]})
                    return final_res, contents

                elif "text" in candidate_part:
                    reply_text = candidate_part["text"].strip()
                    contents.append({"role": "model", "parts": [{"text": reply_text}]})
                    return reply_text, contents

            except Exception as e:
                if attempt == max_retries - 1:
                    return f"❌ Erreur d'exécution : {str(e)}", history
                time.sleep(2)

        return "⚠️ Service temporairement indisponible, réessayez.", history

    def generate_response(self, system_instruction: str, user_prompt: str, history: list = None) -> tuple[str, list]:
        if history is None:
            history = []
        return self.call_gemini(system_instruction, history, user_prompt)
