from crypt import methods
from flask import Flask, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

#Configuração do servidor SMTP (exemplo: Gmail)
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "pessoa.dvlbp@gmail.com"
app.config["MAIL_PASSWORD"] = "suasenha_ou_app_password"

mail = Mail(app)

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.json
    destinatario = data.get("to")
    assunto = data.get("subject")
    mensagem = data.get("message")

    try:
        msg = Message(assunto, sender=app.config["MAIL_USERNAME"], recipients=[destinatario])
        msg.body = mensagem
        return jsonify({"status": "sucesso", "mensagem": "Email enviado com sucesso!"})
    
    except Exception as e:
        return jsonify({"status": "error", "mensagem": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)
