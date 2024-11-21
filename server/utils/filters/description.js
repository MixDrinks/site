import { db } from '~/server/utils/mongo'

export class DescriptionBuilder {
    async buildDescription(filters) {
        let description = '';

        // Start building the description
        description += await this.addAlcoholVolumeDescriptionIfExist(filters['alcohol-volume']);

        if (filters['taste']?.length > 0) {
            description += ', ';
        } else {
            description += ' ';
        }

        description += await this.addTasteDescriptionIfExist(filters['taste']);
        description += 'коктейлі'; // COCKTAIL_NAME

        description += await this.addAlchoholDescriptionIfExist(filters['alcohol']);
        description += await this.addTagsDescriptionIfExist(filters['tags']);
        description += await this.addGoodsDescriptionIfExist(filters['goods']);
        description += await this.addGlasswareDescriptionIfExist(filters['glassware']);

        // trim string remove command and spaces at start and end of string
        description = description.trim().replace(/(^\s*,)|(,\s*$)/g, '').replace(/^./, char => char.toUpperCase()).trim();

        description = description.trim().length > 0 && description.trim() !== 'коктейлі' ? description.trim() : null;
        description = description ? description.charAt(0).toUpperCase() + description.slice(1).toLowerCase() : null;
        return description;
    }

    async addGlasswareDescriptionIfExist(glasswareSlugs) {
        if (glasswareSlugs?.length > 0) {
            const glasswareSlug = glasswareSlugs[0];
            const glassware = await db.collection('glassware').findOne({ slug: glasswareSlug });
            if (glassware) {
                return ` в ${this.capitalize(glassware.name)}`;
            }
        }
        return '';
    }

    async addGoodsDescriptionIfExist(goodSlugs) {
        if (goodSlugs?.length > 0) {
            const goods = await db.collection('goods').find({ slug: { $in: goodSlugs } }).toArray();
            if (goods.length > 0) {
                return ` з ${goods.map(g => this.capitalize(g.name)).join(', ')}`;
            }
        }
        return '';
    }

    async addTagsDescriptionIfExist(tagsSlugs) {
        if (tagsSlugs?.length > 0) {
            const tags = await db.collection('tags').find({ slug: { $in: tagsSlugs } }).sort({ slug: 1 }).toArray();
            if (tags.length > 0) {
                return ` ${tags.map(t => this.capitalize(t.name)).join(', ')}`;
            }
        }
        return '';
    }

    async addAlchoholDescriptionIfExist(alcoholSlugs) {
        if (alcoholSlugs?.length > 0) {
            const alcohols = await db.collection('alcohol').find({ slug: { $in: alcoholSlugs } }).toArray();
            if (alcohols.length > 0) {
                return ` з ${alcohols.map(t => this.capitalize(t.name)).join(', ')}`;
            }
        }
        return '';
    }

    async addTasteDescriptionIfExist(tasteSlugs) {
        if (tasteSlugs?.length > 0) {
            const tastes = await db.collection('tastes').find({ slug: { $in: tasteSlugs } }).toArray();
            if (tastes.length > 0) {
                return `${tastes.map(t => this.capitalize(t.name)).join(', ')} `;
            }
        }
        return '';
    }

    async addAlcoholVolumeDescriptionIfExist(alcoholSlugs) {
        if (alcoholSlugs?.length > 0) {
            const alcoholSlug = alcoholSlugs[0];
            const alcoholVolume = await db.collection('alcoholVolumes').findOne({ slug: alcoholSlug });
            if (alcoholVolume) {
                return this.capitalize(alcoholVolume.name);
            }
        }
        return '';
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
