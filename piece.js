const VALID_MOVES_COLOR = 'rgba(145, 201, 48, 0.5)';

class Piece
{
    #color;
    #type;
    #file;
    #rank;
    #src;
    constructor(color, type, file, rank)
    {
        this.#color  = color;
        this.#type = type;
        this.#file = file;
        this.#rank = rank;
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
    
    getRank()
    {
        return this.#rank;
    }

    getFile()
    {
        return this.#file;
    }
}