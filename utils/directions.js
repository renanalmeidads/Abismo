export const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    NONE: 5
}

export const getDirectionByValue = (value) => {
    return Object.keys(Direction).find(key => Direction[key] === value);
}

export const randomDirection = (excludeDirection) => {
    let newDirection = Phaser.Math.Between(2, 3);

    while (newDirection == excludeDirection) {
        newDirection = Phaser.Math.Between(2, 3);
    }

    return newDirection;
}