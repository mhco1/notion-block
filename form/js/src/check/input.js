
export default ({manyKey})=>({
    ...manyKey(['text'], 'text', 'txt', 'str', ''),
    //...manyKey(['textarea'], 'textarea','text2', 'txt2', 'str2'),
    ...manyKey(['number'], 'number', 'num', 'n'),

    //tel: 'tel',
    ...manyKey(['email'], 'email', 'e', '@'),
    ...manyKey(['password'], 'password', 'pwd'),

    ...manyKey(['date'], 'date', 'dt'),
    ...manyKey(['datetime-local'], 'date-accurate', 'date2', 'dt2'),
    ...manyKey(['time'], 'data-hour', 'hour', 'time', 'dth'),
    ...manyKey(['week'], 'data-week', 'week', 'dtw'),
    ...manyKey(['month'], 'date-month', 'month', 'dtm'),

    tag:'tag',
    //...manyKey(['tag'], 'tag'), // op
    //...manyKey(['checkbox'], 'checkbox', 'check'), // op
    //...manyKey(['radio'], 'radio', 'rad'), // op
    //...manyKey(['select'], 'select', 'option', 'op'), // op
    //...manyKey(['switch'], 'switch', 'toggle', 'tog'), // op
    //
    //...manyKey(['range'], 'range', 'ran'), // op
    //...manyKey(['color'], 'color', '#'), // op
    //...manyKey(['file'], 'file', 'fl'), // op
    //...manyKey(['image'], 'image', 'img'),
})