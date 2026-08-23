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
import datetime


@dataclass
class Avaliado:
    nome: str
    sexo: str 
    data_nascimento: datetime.date

    def calcular_idade(self):
        hoje = datetime.date.today()
        idade = hoje.year - self.data_nascimento.year - ((hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day))
        return idade


    def validar_idade(self):
        idade = self.calcular_idade()
        if 4 < idade < 80:
            return True
        else:
            raise ValueError("Idade inválida. Deve estar entre 5 e 79 anos.")


    def __post_init__(self):
        if not self.nome.replace(" ", "").isalpha():
            raise ValueError("Nome deve conter apenas letras e espaços.")


        if self.sexo not in ["Masculino", "Feminino", "Outro"]:
            raise ValueError("Sexo inválido. Opções válidas: Masculino, Feminino, Outro.")

        
        if self.data_nascimento > datetime.date.today():
            raise ValueError("Data de nascimento não pode ser futura.")

        self.validar_idade()


