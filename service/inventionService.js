const Invention = require("./../models/invention/Invention");
const inventionDto = require("./../models/invention/inventionDto");
const inventionResponseDto = require("./../models/invention/inventionResponseDto");

class inventionService {
    async findAll(page = -1, size = -1) {
        const inventions =
                page > -1 && size > -1 ?
                    await Invention.find()
                        .skip(page*size)
                        .limit(size)
                : await Invention.find();
        return inventions.map(invention => inventionService.toDto(invention));
    }
    /**
     * 
     * @param {inventionDto} invention 
     */
    async create(invention) {
        const inventionCreated = await Invention.create({
            name: invention.getName
        });
        return inventionService.toDto(inventionCreated);
    }
    /**
     * 
     * @param {inventionDto} invention 
     */
    async update(id, invention) {
        const inventionUpdated = await Invention.findByIdAndUpdate(
        { _id: id },
        {
            name: invention.getName
        });
        return inventionService.toDto(inventionUpdated);
    }
    async delete(id) {
        await Invention.findByIdAndDelete({
            _id: id
        });
    }
    //Ez itt a rendes POCO osztály:
    static toDto(invention) {
        return new InventionResponseDto(
            invention._id.toString(),
            invention._name,
            invention.inventors != undefined || invention.inventors != null ? invention.inventors.map(inventor => inventor._id) : []
        );
    }
}
module.exports = inventionService;