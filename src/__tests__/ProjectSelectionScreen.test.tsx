import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import axios from 'axios';
import ProjectSelectionScreen from '../views/ProjectSelectionScreen';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

jest.mock('axios');

describe('Select Project Component ', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const mockedStore = configureStore([]);

    
    test('true', () => {
        expect(true).toBeTruthy();
    })

    test('renders correct amount of projects', async() => {
        mockedAxios.get.mockResolvedValue({
            data: {
                projects: [
                    {id: 1, name: "Road renovation", location: "Warsaw"},
                    {id: 2, name: "New houses", location: "Berlin"}
                ]
            }
            
        });
        const store = mockedStore({
            investment: {}
        })

        render(
            <Provider store={store} >
                <ProjectSelectionScreen />)
            </Provider>
        )

        expect(await screen.findAllByRole('listitem')).toHaveLength(2);
    });

    test('renders with correct location name', async () => {
        mockedAxios.get.mockResolvedValue({
            data: {
                projects: [
                    {id: 1, name: "Road renovation", location: "Warsaw"}
                ]
            }
        });

        const store = mockedStore({
            investment: {}
        })

        render(
            <Provider store={store} >
                <ProjectSelectionScreen />)
            </Provider>
        )

        expect(await screen.findByRole("listitem")).toHaveTextContent("Warsaw");
    });

    test('render with error message, when data could not be fetched', async () => {
        mockedAxios.get.mockRejectedValueOnce({err: {msg: 'could not find'}});
        const store = mockedStore({
            investment: {}
        })

        render(
            <Provider store={store} >
                <ProjectSelectionScreen />)
            </Provider>
        )
        expect(await screen.findByRole('alert')).toBeInTheDocument();
    })

})