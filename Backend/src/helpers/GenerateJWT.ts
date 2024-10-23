import jwt, { SignOptions } from 'jsonwebtoken';

const generateJWT = (_idUser: string, email: string): Promise<string> => {
    const secretJwt: string = "User";

    const payload = {
        _idUser,
        email,
    };

    const signOptions: SignOptions = { expiresIn: "12h" };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretJwt, signOptions, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token as string);
        });
    });
};


const GenerateJWTWithExpirationShortTime = (uid: string = ""): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload: any = { uid };

        const secretJWT: string = "LoCoMiA";

        jwt.sign(payload, secretJWT, {
            expiresIn: '4h'
        }, (err: any,  token: string) =>{
            return (!err) ? resolve(token) : reject(err);
        });
    })
};

export { generateJWT, GenerateJWTWithExpirationShortTime };