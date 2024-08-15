import CarroServices from '../Services/CarroServices.js'; // Adicione a extensão .js

const buscarTodos = async (req, res) => {
    let json = {error:'', result:[]};

    try {
        let carros = await CarroServices.buscarTodos();

        for (let i in carros) {
            json.result.push({
                codigo: carros[i].codigo,
                modelo: carros[i].modelo,
                placa: carros[i].placa,
            });
        }

        // Renderiza a visualização com os resultados
        res.render('carros', { carros: json.result });
    } catch (error) {
        json.error = 'Erro ao buscar os carros';
        res.status(500).json(json);
    }
};

const buscarUm = async (req, res) => {
    const { codigo } = req.params;

    try {
        const carro = await CarroServices.buscarUm(codigo);

        // Renderiza a página com o resultado ou com uma mensagem de erro
        res.render('result-page', { data: {
            error: carro ? '' : 'Carro não encontrado',
            result: carro || {}
        }});
    } catch (error) {
        console.error('Erro ao buscar o carro:', error);
        res.render('result-page', { data: {
            error: 'Erro ao buscar o carro',
            result: {}
        }});
    }
}

const inserir = async (req, res) =>{
    console.log('Requisição recebida:', req.body);  // Adicione este log
    let json = {error:'', result:{}}

    let modelo = req.body.modelo
    let placa = req.body.placa

    if(modelo && placa){
        let carroCodigo = await CarroServices.inserir(modelo, placa)
        json.result = {
            codigo: carroCodigo,
            modelo,
            placa
        }
    }
    else{
        json.error = 'campos nao enviados'
    }
    res.json(json)
}

const alterar = async (req, res) => {
    let json = {error:'', result: {}}
    const codigo = req.params.codigo
    const modelo = req.body.modelo
    const placa = req.body.placa
    if(codigo && modelo && placa){
        await CarroServices.alterar(codigo, modelo, placa)
        json.result = {
            codigo,
            modelo,
            placa
        }
    }
    else{
        json.error = 'campos nao enviados'
    }
    res.json(json)
}

const excluir = async (req, res) => {
    let json = {error:'', result: {}}
    //const codigo = req.params.codigo
    const codigo = req.params.codigo

    if(codigo){
        await CarroServices.excluir(codigo)
    }
    else{
        json.error = 'campos nao enviados'
    }
    res.json(json)
}

    export default {
        buscarTodos,
        buscarUm,
        inserir,
        alterar,
        excluir
    };