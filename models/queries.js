const queriesUser = {
    getUsers: `SELECT userID, name, email
                FROM users;`,

    getUserByEmail: `SELECT userID, name, email
                    FROM users
                    WHERE email=$1;`,

    getUserPassByEmail: `SELECT userID, password
                    FROM users
                    WHERE email=$1;`,

    createUser: `INSERT INTO users (name, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING userID, name, email;`,

    changePassByEmail: `UPDATE users
                        SET password=$1
                        WHERE email=$2;`
};


const queriesRol = {
    insertRol: `INSERT INTO rols (userID, rol)
                VALUES ($1, $2);`,

    getRol: `SELECT rol
                FROM rols
                WHERE userID=$1;`
};


const queriesLog = {
    insertLog: `INSERT INTO logs (userID, event)
                VALUES ((SELECT userID
                            FROM users
                            WHERE email=$1), $2);`,

    getLogs: `SELECT *
                FROM logs;`,

    getLogByID: `SELECT log, date
                FROM logs
                WHERE userID=$1;`,

    getLogsByDates: `SELECT log, date
                    FROM logs
                    WHERE date BETWEEN [$1] AND [$2];`
};


const queriesEntries = {
    getEntries: `SELECT e.entryID, e.title, e.content, e.image, e.extract, e.date, e.time, u.name
                    FROM entries AS e
                    INNER JOIN users AS u
                    ON e.userID=u.userID;`,

    getEntriesByEmail: `SELECT e.title, e.content, e.image, e.extract, e.date, u.name
                        FROM entries AS e
                        INNER JOIN users AS u
                        ON e.userID=u.userID
                        WHERE u.email=$1;`,

    getEntryByID: `SELECT e.title, e.content, e.image, e.extract, e.date, u.name
                        FROM entries AS e
                        INNER JOIN users AS u
                        ON e.userID=u.userID
                        WHERE u.userID=$1;`,

    createEntry: `INSERT INTO entries
                    (title, content, userid, extract, image)
                    VALUES ($1, $2, (SELECT userID 
                                    FROM users 
                                    WHERE email=$3), $4, $5)
                    RETURNING title, content, extract, image, date, time;`,

    updateEntryByID: `UPDATE entries 
                    SET title=$1,
                        content=$2,
                        extract=$3,
                        image=$4                        
                    WHERE entryID=$5
                    RETURNING title, content, extract, image;`,

    deleteEntry: `DELETE FROM entries 
                    WHERE entryID=$1;`
}


module.exports = {
    queriesUser,
    queriesLog,
    queriesRol,
    queriesEntries
}

