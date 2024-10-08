const { request, inputValidation } = require('./util/util.js')

module.exports = {
    /**
     * List all active player alliances.
     * @returns {Promise<[number]>} A array of all active player alliances.
     */
    alliances() {
        return request({
            subUrl: 'alliances'
        })
    },
    /**
     * Get all current member corporations of an alliance.
     * @param ID {number} The alliance ID to get the alliances from.
     * @returns {Promise<[number]>} The alliances in the alliance.
     */
    corps(allianceID) {
        inputValidation({
            input: allianceID,
            type: 'number',
            message: `The function 'alliance.corps' requires an alliance ID!`
        })

        return request({
            subUrl: `alliances/${allianceID}/corporations`
        })
    },
    /**
     * Get the icon urls for a alliance.
     * @param allianceID {number} The alliance ID to get the icon of.
     * @returns {Promise<object>} Links to the different sizes of the alliance icon.
     */
    icon(allianceID) {
        inputValidation({
            input: allianceID,
            type: 'number',
            message: `The function 'alliances.icon' requires an alliance ID!`
        })

        return request({
            subUrl: `alliances/${allianceID}/icons`
        })
    },
    /**
     * Get public information about an alliance.
     * @param ID {number} The alliance ID to get info from.
     * @returns {Promise<object>} Public info on the alliance.
     */
    info(allianceID) {
        inputValidation({
            input: allianceID,
            type: 'number',
            message: `The function 'alliances.info' requires an alliance ID!`
        })

        return request({
            subUrl: `alliances/${allianceID}`
        })
    },
    /**
     *
     */
    contacts: {
        /**
         * Get alliance contacts.
         * @param {number} allianceID
         * @requires esi-alliances.read_contacts.v1
         * @returns {Promise<object>}
         */
        contacts(allianceID) {
            inputValidation({
                input: allianceID,
                type: 'number',
                message: `The function 'alliance.contacts.contacts' requires a alliance ID!`
            })

            request({
                subUrl: `alliances/${allianceID}/contacts`,
                needsAuth: true
            })
        },
        /**
         * Get alliance contact labels
         * @param {number} allianceID
         * @requires esi-alliances.read_contacts.v1
         * @returns {Promise<object>}
         */
        labels(allianceID) {
            inputValidation({
                input: allianceID,
                type: 'number',
                message: `The function 'alliance.contacts.labels' requires a alliance ID!`
            })

            request({
                subUrl: `alliances/${allianceID}/contacts/labels`,
                needsAuth: true
            })
        }
    }
}