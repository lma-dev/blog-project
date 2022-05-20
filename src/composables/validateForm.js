import {
    ref
} from "vue";

let validateForm = (title, body, tags) => {
    // let tag = ref('');
    let tagsCheck = ref('');
    let errorsCheck = ref([]);
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(title)) {
        errorsCheck.value.push('Special characters are not allow in Title.');
    }
    if (format.test(body)) {
        errorsCheck.value.push('Special characters are not allow in body.');
    }
    if (!title || title.length < 2) {
        errorsCheck.value.push('Title must be greater than 2 counts');
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