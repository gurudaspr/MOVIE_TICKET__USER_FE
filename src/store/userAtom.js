import recoil from 'recoil';

export const userIdState  = recoil.atom({
    key: 'userId',
    default: '',
});
