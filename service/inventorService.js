const mongoose = require("mongoose");
const Inventor = require("../models/inventor/Inventor");
const Invention = require("../models/invention/Invention");
const inventorRequestDto = require("../models/inventor/InventorRequestDto");
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
        return inventors.map(inventor => this.toRespDto(inventor));
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
    async findAllNameLike(name, isMinimal = false, defaultLimit = 20) {
        const inventors = await Inventor.find({
            name: {
                $regex: name,
                $options: "i"
            }
        }).limit(defaultLimit);
        if(isMinimal)
            return inventors.map(inventor => this.toShortDto(inventor));
        return inventors.map(inventor => this.toRespDto(inventor));
    }
    /**
     * 
     * @param {inventorRequestDto} inventor
     * @returns {inventorResponseDto}
     */
    async create(inventor) {
        const inventorCreated = await Inventor.create({
            name: inventor.getName(),
            bornAt: inventor.getBornAt(),
            diedAt: inventor.getDiedAt(),
            inventions: inventor.getInventions().map(id => new mongoose.Types.ObjectId(id))
        });

        await Invention.updateMany({
                _id: {
                    $in: inventorCreated.inventions
                }
            },
            {
                $addToSet: {
                    inventors: inventorCreated._id
                }
            }
        );
            
        return this.toRespDto(inventorCreated);
    }
    /**
     * @param {String} id 
     * @param {inventorRequestDto} inventor
     * @returns {inventorResponseDto}
     */
    async update(id, inventor) {
        const oldInventor = await Inventor.findById(id);

        const newInventionIds = inventor.getInventions();

        const oldIds = oldInventor.inventions.map(id => id.toString());

        // Újak
        const addedIds = newInventionIds.filter(
            id => !oldIds.includes(id)
        );

        // Töröltek
        const removedIds = oldIds.filter(
            id => !newInventionIds.includes(id)
        );

        const inventorUpdated = await Inventor.findByIdAndUpdate(
            id,
            {
                name: inventor.getName(),
                bornAt: inventor.getBornAt(),
                diedAt: inventor.getDiedAt(),
                inventions: newInventionIds
            },
            {
                new: true
            }
        );

        //Hozzáadás
        if (addedIds.length > 0) {
            await Invention.updateMany(
                { _id: { $in: addedIds } },
                {
                    $addToSet: {
                        inventors: inventorUpdated._id
                    }
                }
            );
        }

        //Törlés
        if (removedIds.length > 0) {
            await Invention.updateMany(
                { _id: { $in: removedIds } },
                {
                    $pull: {
                        inventors: inventorUpdated._id
                    }
                }
            );
        }
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
        return new inventorResponseDto(
            inventor._id.toString(),
            inventor.name,
            inventor.bornAt,
            inventor.diedAt,
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
            inventor.bornAt,
            inventor.diedAt,
            inventor.inventors != undefined || inventor.inventors != null ? inventor.inventors.map(invention => invention._id) : []
        );
    }
}
module.exports = inventorService;