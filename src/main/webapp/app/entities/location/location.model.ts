import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public country?: string,
        public dealerLocations?: BaseEntity[],
        public custLocations?: BaseEntity[],
        public deliveryLocations?: BaseEntity[],
    ) {
    }
}
