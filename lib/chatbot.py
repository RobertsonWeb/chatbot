import transformers
from transformers import pipeline

from ..configuracoes import MODEL, FINE_TUNNING

def perguntar(pergunta):
    qea = pipeline("question-answering", model=MODEL)
    resposta = qea(question=pergunta, context=FINE_TUNNING)
    return resposta['answer']