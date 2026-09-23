import { getFilterSnapshot } from '~/server/utils/filters/cache'

export class DescriptionBuilder {
    async buildDescription(filters) {
        const snapshot = await getFilterSnapshot()
        let description = ''

        // Start building the description
        description += this.addAlcoholVolumeDescriptionIfExist(
            snapshot,
            filters['alcohol-volume']
        )

        if (filters['taste']?.length > 0) {
            description += ', '
        } else {
            description += ' '
        }

        description += this.addTasteDescriptionIfExist(
            snapshot,
            filters['taste']
        )
        description += 'коктейлі' // COCKTAIL_NAME

        description += this.addAlchoholDescriptionIfExist(
            snapshot,
            filters['alcohol']
        )
        description += this.addTagsDescriptionIfExist(snapshot, filters['tags'])
        description += this.addGoodsDescriptionIfExist(
            snapshot,
            filters['goods']
        )
        description += this.addGlasswareDescriptionIfExist(
            snapshot,
            filters['glassware']
        )

        // trim string remove command and spaces at start and end of string
        description = description
            .trim()
            .replace(/(^\s*,)|(,\s*$)/g, '')
            .replace(/^./, (char) => char.toUpperCase())
            .trim()

        description =
            description.trim().length > 0 && description.trim() !== 'коктейлі'
                ? description.trim()
                : null
        description = description
            ? description.charAt(0).toUpperCase() +
              description.slice(1).toLowerCase()
            : null
        return description
    }

    // Selected items of a group, in the collection's natural order.
    selectedItems(snapshot, group, slugs) {
        if (!(slugs?.length > 0)) return []
        return Object.values(snapshot.groups[group]).filter((item) =>
            slugs.includes(item.slug)
        )
    }

    addGlasswareDescriptionIfExist(snapshot, glasswareSlugs) {
        if (glasswareSlugs?.length > 0) {
            const glassware = snapshot.groups.glassware[glasswareSlugs[0]]
            if (glassware) {
                return ` в ${this.capitalize(glassware.name)}`
            }
        }
        return ''
    }

    addGoodsDescriptionIfExist(snapshot, goodSlugs) {
        const goods = this.selectedItems(snapshot, 'goods', goodSlugs)
        if (goods.length > 0) {
            return ` з ${goods.map((g) => this.capitalize(g.name)).join(', ')}`
        }
        return ''
    }

    addTagsDescriptionIfExist(snapshot, tagsSlugs) {
        const tags = this.selectedItems(snapshot, 'tags', tagsSlugs).sort(
            (a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0)
        )
        if (tags.length > 0) {
            return ` ${tags.map((t) => this.capitalize(t.name)).join(', ')}`
        }
        return ''
    }

    addAlchoholDescriptionIfExist(snapshot, alcoholSlugs) {
        const alcohols = this.selectedItems(snapshot, 'alcohol', alcoholSlugs)
        if (alcohols.length > 0) {
            return ` з ${alcohols.map((t) => this.capitalize(t.name)).join(', ')}`
        }
        return ''
    }

    addTasteDescriptionIfExist(snapshot, tasteSlugs) {
        const tastes = this.selectedItems(snapshot, 'taste', tasteSlugs)
        if (tastes.length > 0) {
            return `${tastes.map((t) => this.capitalize(t.name)).join(', ')} `
        }
        return ''
    }

    addAlcoholVolumeDescriptionIfExist(snapshot, alcoholSlugs) {
        if (alcoholSlugs?.length > 0) {
            const alcoholVolume =
                snapshot.groups['alcohol-volume'][alcoholSlugs[0]]
            if (alcoholVolume) {
                return this.capitalize(alcoholVolume.name)
            }
        }
        return ''
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}
