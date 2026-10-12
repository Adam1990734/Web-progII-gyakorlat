const Invention = require("../models/invention/Invention");
const inventionDto = require("../models/invention/InventionDto");
const inventionShortDto = require("../models/invention/inventionShortDto");
const inventionResponseDto = require("../models/invention/InventionResponseDto");

class inventionService {
    /**
     * 
     * @param {Number} page 
     * @param {Number} size 
     * @returns {inventionResponseDto[]}
     */
    async findAll(page = -1, size = -1) {
        const inventions =
                page > -1 && size > -1 ?
                    await Invention.find()
                        .skip(page*size)
                        .limit(size)
                        .populate("inventors")
                : await Invention.find().populate("inventions");
        return inventions.map(invention => this.toRespDto(invention));
    }
    /**
     * 
     * @param {String} id 
     */
    async findById(id) {
        const invention = await Invention.findById(id).populate("inventors");
        return this.toRespDto(invention);
    }
    /**
     * 
     * @param {inventionDto} invention
     * @returns {inventionResponseDto}
     */
    async create(invention) {
        const inventionCreated = await Invention.create({
            name: invention.getName
        });
        return this.toRespDto(inventionCreated);
    }
    /**
     * @param {String} id 
     * @param {inventionDto} invention
     * @returns {inventionResponseDto}
     */
    async update(id, invention) {
        const inventionUpdated = await Invention.findByIdAndUpdate(
        { _id: id },
        {
            name: invention.getName
        });
        return this.toRespDto(inventionUpdated);
    }
    /**
     * 
     * @param {String} id
     * @returns {void} 
     */
    async delete(id) {
        await Invention.findByIdAndDelete({
            _id: id
        });
    }
    /**
     * 
     * @param {Invention} invention 
     * @returns {inventionShortDto}
     */
    toShortDto(invention) {
        return new inventionShortDto(
            invention._id.toString(),
            invention.name
        );
    }
    //Ez itt a rendes POCO osztály:
    /**
     * 
     * @param {Invention} invention 
     * @returns {inventionResponseDto}
     */
    toRespDto(invention) {
        return new inventionResponseDto(
            invention._id.toString(),
            invention.name,
            invention.inventors != undefined || invention.inventors != null ? invention.inventors.map(inventor => this.toShortDto(inventor)) : []
        );
    }
    /**
     * 
     * @param {Invention} invention 
     * @returns {inventionDto}
     */
    toSimpDto(invention) {
        return new inventionDto(
            invention.name
        );
    }
}
module.exports = inventionService;