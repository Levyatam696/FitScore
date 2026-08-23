from app.domain.entities.avaliado_entity import Avaliado

def criar_avaliado(nome, sexo, data_nascimento):
    try:
        avaliado = Avaliado(nome, sexo, data_nascimento)
        return avaliado
    
    except ValueError:
        raise ValueError(f"Erro ao criar avaliado, por favor verifique os dados fornecidos: {nome}, {sexo}, {data_nascimento}.")


def editar_avaliado(avaliado, nome=None, sexo=None, data_nascimento=None):
    try:
        if nome is not None:
            avaliado.nome = nome
            
        if sexo is not None:
            avaliado.sexo = sexo

        if data_nascimento is not None:
            avaliado.data_nascimento = data_nascimento
        
        return avaliado
    
    except ValueError:
        raise ValueError(f"Erro ao editar avaliado, por favor verifique os dados fornecidos: {nome}, {sexo}, {data_nascimento}.")

