const Invention = require("./../models/invention/Invention");
const inventionDto = require("./../models/invention/inventionDto");
const inventionShortDto = require("./../models/invention/inventionShortDto");
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
    static toShortDto(invention) {
        return new inventionShortDto(
            invention._id,
            invention.name
        );
    }
    //Ez itt a rendes POCO osztály:
    static toRespDto(invention) {
        return new inventionResponseDto(
            invention._id.toString(),
            invention.name,
            invention.inventors != undefined || invention.inventors != null ? invention.inventors.map(inventor => this.toShortDto(inventor)) : []
        );
    }
    static toSimpDto(invention) {
        return new inventionDto(
            invention.name,
            invention.inventors != undefined || invention.inventors != null ? invention.inventors.map(inventor => inventor._id) : []
        );
    }
}
module.exports = inventionService;