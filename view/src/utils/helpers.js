import { isEmpty } from "validator";


export const validateAddress = (addObj) => {
    
    for(const item in addObj){
        if (item !== 'address2' && isEmpty(addObj[item])) {
            return false;
        }
    }
    return true;
}