from flask import Flask, render_template, send_from_directory, request
import psycopg
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)


def get_db_connection():
    return psycopg.connect(
        dbname=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
        host=os.getenv("DATABASE_HOST"),
        port=os.getenv("DATABASE_PORT")
    )


@app.route("/")
def home():
    name = "Alireza Naderi"

    return render_template(
        "index.html",
        name=name
    )


@app.route("/contact", methods=["POST"])
def contact():

    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not email or not message:
        return "Please fill in all fields.", 400

    conn = get_db_connection()

    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO messages (name, email, message)
        VALUES (%s, %s, %s)
        """,
        (name, email, message)
    )

    conn.commit()

    cur.close()
    conn.close()

    return render_template(
        "index.html",
        name="Alireza Naderi",
        success="Your message has been sent successfully!"
    )

@app.route("/robots.txt")
def robots():
    return send_from_directory("static", "robots.txt")


@app.route("/sitemap.xml")
def sitemap():
    return send_from_directory("static", "sitemap.xml")


if __name__ == "__main__":
    app.run(debug=True)