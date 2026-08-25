from app.domain.entities.avaliado_entity import Avaliado
from app.domain.entities.avaliado_entity import validar_dados

def criar_avaliado(nome, sexo, data_nascimento):
    try:
        avaliado = Avaliado(nome, sexo, data_nascimento)
        return avaliado
    
    except ValueError:
        raise ValueError(f"Erro ao criar avaliado, por favor verifique os dados fornecidos: {nome}, {sexo}, {data_nascimento}.")


def editar_dados(self, nome, sexo, data_nascimento):    #editar a data de nascimento, sexo e nome do avaliado
    self.nome = nome
    self.sexo = sexo
    self.data_nascimento = data_nascimento

    self.validar_dados()


