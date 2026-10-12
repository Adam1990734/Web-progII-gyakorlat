const Inventor = require("../models/inventor/Inventor");
const inventorDto = require("../models/inventor/InventorDto");
const inventorShortDto = require("../models/inventor/inventorShortDto");
const inventorResponseDto = require("../models/inventor/InventorResponseDto");

class inventorService {
    /**
     * 
     * @param {Number} page 
     * @param {Number} size 
     * @returns {inventorResponseDto[]}
     */
    async findAll(page = -1, size = -1) {
        const inventors =
                page > -1 && size > -1 ?
                    await Inventor.find()
                        .skip(page*size)
                        .limit(size)
                        .populate("inventions")
                : await Inventor.find().populate("inventions");
        return inventors.map(inventor => inventorService.toRespDto(inventor));
    }
    /**
     * @param {String} id 
     * @param {boolean} [isMinimal=false] 
     */
    async findById(id, isMinimal = false) {
        const inventor = await Inventor.findById(id).populate("inventions");
        if(isMinimal)
            return this.toSimpDto(inventor);
        return this.toRespDto(inventor);
    }
    /**
     * 
     * @param {String} name 
     * @param {boolean} [isMinimal=false] 
     * @returns 
     */
    async findAllNameLike(name, isMinimal = false) {
        const inventors = await Inventor.find({
            name: {
                $regex: name,
                $options: "i"
            }
        });
        if(isMinimal)
            return inventors.map(inventor => this.toShortDto(inventor));
        return inventors.map(inventor => this.toRespDto(inventor));
    }
    /**
     * 
     * @param {inventorDto} inventor
     * @returns {inventorResponseDto}
     */
    async create(inventor) {
        const inventorCreated = await Inventor.create({
            name: inventor.getName,
            bornAt: inventor.getBornAt,
            diedAt: inventor.getDiedAt
        });
        return this.toRespDto(inventorCreated);
    }
    /**
     * @param {String} id 
     * @param {inventorDto} inventor
     * @returns {inventorResponseDto}
     */
    async update(id, inventor) {
        const inventorUpdated = await Inventor.findByIdAndUpdate(
        { _id: id },
        {
            name: inventor.getName,
            bornAt: inventor.getBornAt,
            diedAt: inventor.getDiedAt
        });
        return this.toRespDto(inventorUpdated);
    }
    /**
     * 
     * @param {String} id
     * @returns {void} 
     */
    async delete(id) {
        await Inventor.findByIdAndDelete({
            _id: id
        });
    }
    /**
     * 
     * @param {Inventor} inventor 
     * @returns {inventorShortDto}
     */
    toShortDto(inventor) {
        return new inventorShortDto(
            inventor._id,
            inventor.name
        );
    }
    //Ez itt a rendes POCO osztály:
    /**
     * 
     * @param {Inventor} inventor 
     * @returns {inventorResponseDto}
     */
    toRespDto(inventor) {
        return new InventorResponseDto(
            inventor._id.toString(),
            inventor.name,
            inventor.BornAt,
            inventor.DiedAt,
            inventor.inventions != undefined || inventor.inventions != null ? inventor.inventions.map(invention => this.toShortDto(invention)) : []
        );
    }
    /**
     * 
     * @param {Inventor} inventor 
     * @returns {inventorDto}
     */
    toSimpDto(inventor) {
        return new inventionDto(
            inventor.name,
            inventor.BornAt,
            inventor.DiedAt,
            inventor.inventors != undefined || inventor.inventors != null ? inventor.inventors.map(invention => invention._id) : []
        );
    }
}
module.exports = inventorService;