from datetime import datetime
from enum import Enum


def calcular_idade(self):   #calcular a idade do avaliado com base na data de nascimento
    hoje = datetime.date.today()
    idade = hoje.year - self.data_nascimento.year - ((hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day))
    return idade


