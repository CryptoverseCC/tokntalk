import find from 'lodash/fp/find';

import clubs from './clubs';

const blacklist = [];

export default clubs.filter(({ is721 }) => is721).filter(({ address }) => !find({ address })(blacklist));
