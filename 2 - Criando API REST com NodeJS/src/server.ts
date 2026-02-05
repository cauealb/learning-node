interface User {
    name: string;
    age?: number;
}

const calculateAgeUser = (user: User) => {
    return 2026 - user.age!
}

calculateAgeUser({
    name: 'Cauê',
    age: 19
})