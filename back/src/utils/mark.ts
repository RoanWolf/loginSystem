export const markEmail = (email: string) =>{
    const [name, domain] = email.split("@");
    return name[0] + "**@" + domain;
}