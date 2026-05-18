# Authentication vs Authorization

## Authentication
- Verifies who you are (e.g., logging in with a username and password).

## Authorization
- Determines what you can do after authentication (e.g., accessing specific pages or data).

## Key Differences
- **Authentication** comes before **authorization**.
- **Authentication** is about identity; **authorization** is about permissions.
- **Authentication methods** include passwords, biometrics, and OTPs.
- **Authorization methods** include role-based access control (RBAC) and access control lists (ACL).

---

# How Are Passwords Stored?

## Plaintext Storage (Bad Practice)
- Storing passwords as-is in databases is insecure.

## Hashing
- Converting passwords into a fixed-length string using a one-way function.

## Salting
- Adding a random value to passwords before hashing to prevent precomputed attacks.

## Peppering
- Using a secret key to further protect passwords from brute force attacks.

## Best Practices
- Use strong hashing algorithms (bcrypt, Argon2, PBKDF2).
- Always use a unique salt for each password.
- Avoid outdated hashing algorithms like MD5 and SHA-1.

---

# What is Hashing?

## Definition
- A cryptographic function that converts input data into a fixed-length output.

## Characteristics
- **Deterministic**: Same input always gives the same output.
- **Irreversible**: Cannot retrieve the original input from the hash.
- **Collision-resistant**: Hard to find two different inputs producing the same hash.

## Common Hashing Algorithms
- **Secure**: SHA-256, SHA-3, bcrypt, Argon2
- **Weak**: MD5, SHA-1 (prone to collisions)

## Uses of Hashing
- Storing passwords securely.
- Data integrity checks (e.g., file verification).
- Digital signatures.

---

# What is Salting?

## Definition
- Adding a random value (salt) to a password before hashing.

## Purpose
- Prevents **rainbow table attacks** (precomputed hash attacks).
- Ensures that identical passwords have different hashes.

## Example
```js
password = "mypassword"
salt = "randomvalue"
hash = hashFunction(password + salt)
```

## Best Practices
- Generate a unique salt for each password.
- Store the salt along with the hashed password.
- Use sufficiently long salts (at least 16 bytes).












        <% if(currUser && currUser._id.equals(listing.owner._id)) {%>
