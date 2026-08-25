#O sistema deve permitir inserir escola e turma
#Os campos devem aceitar texto
#O sistema deve limitar tamanho dos campos
#O sistema deve permitir edição posterior
#O sistema deve armazenar corretamente

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
    escola: str
    turma: str

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


        if not isinstance(self.sexo, Sexo):
            raise ValueError("Sexo inválido.")


        if self.data_nascimento > datetime.date.today():
            raise ValueError("Data de nascimento não pode ser futura.")


        self.validar_idade()
