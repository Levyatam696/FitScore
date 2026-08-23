#O sistema deve permitir inserir nome, sexo e data de nascimento
#Todos os campos devem ser obrigatórios
#O sistema deve validar:
#Nome: apenas letras e espaços
#Sexo: opções válidas
#Data: formato válido e não futura
#O sistema deve calcular a idade automaticamente
#O sistema deve armazenar corretamente os dados
#O sistema deve permitir edição posterior

from dataclasses import dataclass
from datetime import date


@dataclass
class Avaliado:
	nome: str
	sexo: str
	data_nascimento: date

