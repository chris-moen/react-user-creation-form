/**
 * @jest-environment jsdom
 */

import React from 'react';

import { expect, test } from '@jest/globals';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';

import UserForm from './UserForm';

enableFetchMocks();

const mockSelectsResponse = {
    occupations: ["foo", "bar"],
    states: [
        { name: "FooTown", abbreviation: "FT" },
        { name: "BarVille", abbreviation: "BV" }
    ]
}

test('displays form with populated selects', async () => {

    fetch.mockResponseOnce(JSON.stringify(mockSelectsResponse));

    const userForm = render(<UserForm />);
    const selectOcc = await userForm.findByTestId('select-occupation');

    expect(selectOcc.innerHTML).toContain('<option value=\"foo\">');
    expect(selectOcc.innerHTML).toContain('<option value=\"bar\">');

    const selectSt = await userForm.findByTestId('select-state');

    expect(selectSt.innerHTML).toContain('<option value=\"FT\">FooTown');
    expect(selectSt.innerHTML).toContain('<option value=\"BV\">BarVille');
});

test('can submit user', async () => {

    fetch.mockResponseOnce(JSON.stringify(mockSelectsResponse));

    const userForm = render(<UserForm />);
    const selectOcc = await userForm.findByTestId('select-occupation');
    const selectSt = await userForm.findByTestId('select-state');
    const inputName = await userForm.findByTestId('input-name');
    const inputEmail = await userForm.findByTestId('input-email');
    const inputPass = await userForm.findByTestId('input-pass');
    const btn = await userForm.getByTestId('submit-btn');

    fireEvent.change(selectOcc, { target: { value: "foo" } });
    fireEvent.change(selectSt, { target: { value: "BV" } });
    fireEvent.change(inputName, { target: { value: "Slim Shady" } });
    fireEvent.change(inputEmail, { target: { value: "m@mm.com" } });
    fireEvent.change(inputPass, {target: { value: "8mile" } });

    fetch.mockResponseOnce(JSON.stringify({ ok: true, status: 200 }));

    fireEvent.click(btn);

    const confirm = await userForm.findByTestId('success');

    expect(confirm.innerHTML).toContain('Slim Shady');
    expect(confirm.innerHTML).toContain('m@mm.com');
});


