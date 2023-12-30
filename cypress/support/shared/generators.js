export function randomSting(){
    return Math.random().toString(36).substring(7);
}

export function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
