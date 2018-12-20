module.exports = {
    get,
    set,
};

const state = {};

function get(key) {
    return state[key] || null;
}

function set(key, value) {
    state[key] = value;
}
