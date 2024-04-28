import { useEffect, useState } from 'react';
import logo from 'assets/svg/spotify-logo.svg';
import Prompt from './components/Prompt';
import SuggestionsContainer from './components/Suggestion/SuggestionsContainer';
import useAction from './hooks/useAction';
import useCommand from './hooks/useCommand';
import useSuggestion from './hooks/useSuggestion';

function Spotlightify() {
  const [promptInput, setPromptInput] = useState('');

  const {
    activeCommand,
    commandTitles,
    popCommand,
    pushCommand,
    setActiveCommand,
    clearCommands,
  } = useCommand();

  const { fetchSuggestions, setSuggestionList, suggestions, errorOccurred } =
    useSuggestion({
      activeCommand,
      input: promptInput,
    });

  const { handleAction } = useAction({
    pushCommand,
    popCommand,
    setActiveCommand,
    clearCommands,
    setPromptText: setPromptInput,
    activeCommand,
    promptInput,
    setSuggestionList,
  });

  const onPromptChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setPromptInput(value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!activeCommand) {
          window.electron.minizeWindow();
        }
        popCommand();
      }
      if (event.key === 'Backspace') {
        if (promptInput.length === 0 && activeCommand) {
          popCommand();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener on cleanup
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCommand, popCommand, promptInput.length]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions, promptInput]);

  useEffect(() => {
    setPromptInput(activeCommand ? activeCommand.input : '');
  }, [activeCommand]);

  useEffect(() => {
    window.electron.setNumberOfSuggestions(suggestions.length);
  }, [suggestions.length]);

  return (
    <div className="base">
      <div className="input-wrapper">
        <img className="spotify-logo" src={logo} alt="spotify logo" />
        {commandTitles.length !== 0 && (
          <div className="command-title-container">
            <div
              className={`command-title-container__title${errorOccurred ? '--error' : ''}`}
            >
              {commandTitles.join('/')}
            </div>
          </div>
        )}
        <Prompt value={promptInput} onChange={onPromptChange} />
      </div>
      <SuggestionsContainer
        suggestions={suggestions}
        actionHandler={handleAction}
      />
    </div>
  );
}

export default Spotlightify;
