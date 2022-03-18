const VALID_MOVES_COLOR = 'rgba(145, 201, 48, 0.5)';

class Piece
{
    #color;
    #type;
    #src;
    constructor(color, type)
    {
        this.#color  = color;
        this.#type = type;
        this.#src = "pieces/" + color + "/" + color + "-" + type + ".png";
    }

    getType()
    {
        return this.#type;
    }

    getColor()
    {
        return this.#color;
    }
    
    getSrc()
    {
        return this.#src;
    }
}