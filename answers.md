1. What is the purpose of using _sessions_?

   sessions are used to keep track of a cookie's validity. a cookie is valid only as long as its session is active, once the session ends, generally by expiring via a time constraint, the cookie is no longer valid.

1. What does bcrypt do to help us store passwords in a secure manner.

   bcrypt hashes the password. in our case, as soon as the password is received in a request, it is hashed, and then the hashed password is stored on the server. that way, if the server is compromised, the users password is not. bcrypt will also allow us to check a stored / hashed password against a password sent in with a login request. basically, it allows us to convert our passwords into a secure secret form that cannot be recovered to their original form.

1. What does bcrypt do to slow down attackers?

   didnt we just talk about this? it hashes the password so the attacker doesnt have the actual password to use elsewhere. the password is hashed using other parameters the attacker will not know. the attacker will have to guess these parameters and the password in order to have it hashed to the same code.

1. What are the three parts of the JSON Web Token?

   the header, the payload, and the signature. the header tells us information about the type of token and the algorithm used to create it. the payload has all the good info we want to store in the token, like a users name and id. the signature encrypts the other 2 parts together using a secret.
