const connection = require('../configs/dbConfiguration');

const findAll = async () => {
    const clientes = await (await connection)
        .execute('SELECT * FROM clientes');
        console.log(clientes[0]);
    return clientes[0];
}

const save = async (cliente) => {
    const query = 'INSERT INTO clientes(nome, sobrenome, email, avatarUrl) VALUES (?, ?, ?, ?)';
    const isOk = await (await connection).execute(query,
        [cliente.nome, cliente.sobrenome, cliente.email,
        cliente.avatarUrl]);
    return isOk[0].affectedRows === 1;
}

const update = async (cliente) => {
    const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, avatarUrl = ? WHERE id = ?';
    const isOk = await (await connection).execute(query,
        [cliente.nome, cliente.sobrenome, cliente.email, cliente.avatarUrl,
        cliente.id]);
    return isOk[0].affectedRows === 1;
}

const remove = async (id) => {
    const query = 'DELETE FROM clientes WHERE id = ?';
    const isOk = await (await connection).execute(query, [id]);
    return isOk[0].affectedRows === 1;
}
   


module.exports = {
    findAll,
    save,
    update,
    remove,
}