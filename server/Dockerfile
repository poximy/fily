FROM python:3.9-bullseye

WORKDIR /server

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD ["python", "main.py"]
