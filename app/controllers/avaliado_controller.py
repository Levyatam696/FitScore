#O sistema deve armazenar corretamente os dados
from dataclasses import dataclass
from enum import Enum
from app.domain.value_objects.sexo import Sexo
import datetime

from app.domain.value_objects import sexo


@dataclass
class Avaliado:
    nome: str
    sexo: Sexo
    data_nascimento: datetime.date

    def __post_init__(self):
        self.validar_dados()


    def calcular_idade(self):   #calcular a idade do avaliado com base na data de nascimento
        hoje = datetime.date.today()
        idade = hoje.year - self.data_nascimento.year - ((hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day))
        return idade


    def validar_idade(self):    #validar se a idade do avaliado está entre 5 e 79 anos
        idade = self.calcular_idade()
        if 4 < idade < 80:
            return True
        else:
            raise ValueError("Idade inválida. Deve estar entre 5 e 79 anos.")


    def validar_dados(self):    #validar os dados do avaliado
        if not self.nome.replace(" ", "").isalpha():
                raise ValueError("Nome deve conter apenas letras e espaços.")


        if not self.nome.strip():
            raise ValueError("Nome é obrigatório.")


        if not self.sexo.strip():
            raise ValueError("escolhe o seu sexo é obrigatório.")


        if self.sexo not in ["Masculino", "Feminino", "Outro"]:
            raise ValueError("Sexo inválido. Opções válidas: Masculino, Feminino, Outro.")


        if self.data_nascimento > datetime.date.today():
            raise ValueError("Data de nascimento não pode ser futura.")


        self.validar_idade()


    def editar_dados(self, nome, sexo, data_nascimento):    #editar a data de nascimento, sexo e nome do avaliado
        self.nome = nome
        self.sexo = sexo
        self.data_nascimento = data_nascimento

        self.validar_dados()

