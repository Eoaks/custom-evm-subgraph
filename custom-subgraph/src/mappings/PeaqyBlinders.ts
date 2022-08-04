
import {
    AddedMember,
    AddedAnother
} from '../types/PeaqyBlinders/PeaqyBlinders'
import { PeaqyBlinder } from '../types/schema'

export function handleAdd(event: AddedMember): void {
    let _address = event.params.newMember;
    let _name = event.params.name;
    let pq = PeaqyBlinder.load(_address.toString());
    if(!pq) {
        pq = new PeaqyBlinder(_address.toString());
        pq.address = _address;
        pq.addedBy = _address;
        pq.name = _name;
        pq.save();
    }
}


export function handleAddAnother(event: AddedAnother): void {
    let _addedBy = event.params.addedBy;
    let _address = event.params.newMember;
    let _name = event.params.name;
    let pq = PeaqyBlinder.load(_address.toString());
    if(!pq) {
        pq = new PeaqyBlinder(_address.toString());
        pq.address = _address;
        pq.addedBy = _addedBy;
        pq.name = _name;
        pq.save();
    }
}