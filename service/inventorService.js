const Inventor = require("./../models/inventor/Inventor");
const inventorDto = require("./../models/inventor/inventorDto");
const InventorResponseDto = require("./../models/inventor/inventorResponseDto");

class inventorService {
    async findAll(page = -1, size = -1) {
        const inventors =
                page > -1 || size > -1 ?
                    await Inventor.find()
                        .skip((page-1)*size)
                        .limit(size)
                : await Inventor.find();
        return inventors.map(inventor => inventorService.toDto(inventor));
    }
    /**
     * 
     * @param {inventorDto} inventor 
     */
    async create(inventor) {
        const inventorCreated = await Invention.create({
            name: inventor.getName,
            bornAt: inventor.getBornAt,
            diedAt: inventor.getDiedAt
        });
        return inventorService.toDto(inventorCreated);
    }
    /**
     * 
     * @param {inventorDto} inventor 
     */
    async update(id, inventor) {
        const inventorUpdated = await Inventor.findByIdAndUpdate(
        { _id: id },
        {
            name: inventor.getName,
            bornAt: inventor.getBornAt,
            diedAt: inventor.getDiedAt
        });
        return inventorService.toDto(inventorUpdated);
    }
    async delete(id) {
        await Inventor.findByIdAndDelete({
            _id: id
        });
    }
    //Ez itt a rendes POCO osztály:
    static toDto(inventor) {
        return new InventorResponseDto(
            inventor._id,
            inventor.name,
            inventor.BornAt,
            inventor.DiedAt,
            inventor.inventions != undefined || inventor.inventions != null ? inventor.inventions.map(invention => invention._id) : []
        );
    }
}
module.exports = inventorService;