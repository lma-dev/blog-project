import {
    ref
} from "vue";

let validateForm = (title, body, tags) => {
    // let tag = ref('');
    let tagsCheck = ref('');
    let errorsCheck = ref([]);

    if (!title || title.length < 4) {
        errorsCheck.value.push('Title must be greater than 4 counts');
    }
    if (!body || body.length < 15) {
        errorsCheck.value.push('Body must be greater than 15 counts');
    }

    if (!tags.length) {
        errorsCheck.value.push('Please fill content tags or Press enter after filled');
        // tagsCheck.value = 'other';
    }
    return {
        tagsCheck,
        errorsCheck
    };
};

export default validateForm;