package model

type CommandParameters map[string]string

type CommandProperties struct {
	ID                   string `json:"id"`
	Title                string `json:"title"`
	ShorthandTitle       string `json:"shorthandTitle"`
	ShorthandPersistOnUI bool   `json:"shorthandPersistOnUI"`
	DebounceMS           int    `json:"debounceMS"`
}
