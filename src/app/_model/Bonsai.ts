import { Timestamp } from "rxjs";
import { BonsaiStyle } from "./BonsaiStyle";
import { BonsaiType } from "./BonsaiType";

export class Bonsai {
	id: number | null = null;
	name: string = '';
	thumbnailImage: string = '';
    creationDate: Timestamp<any> | null = null;
	bonsaiStyle: BonsaiStyle | null = null;
	bonsaiType: BonsaiType | null = null;

    static fromData(bonsaiData: Bonsai): Bonsai {
        const bonsai: Bonsai = new Bonsai();

        bonsai.id = bonsaiData.id;
        bonsai.name = bonsaiData.name;
        bonsai.thumbnailImage = 'data:image/jpeg;base64,' + bonsaiData.thumbnailImage;
        bonsai.bonsaiStyle = <BonsaiStyle> bonsaiData.bonsaiStyle;
        bonsai.bonsaiType = <BonsaiType> bonsaiData.bonsaiType;

        return bonsai;
    }
}