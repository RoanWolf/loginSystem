export const markEmail = (email) =>{
    const [name, domain] = email.split("@");
    return name[0] + "**@" + domain;
}