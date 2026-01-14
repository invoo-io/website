# MCP (Model Context Protocol) Setup for Claude

This project is configured with MCP servers to enable Claude to interact with your browser and filesystem directly.

## Configuration

The MCP configuration is located in `.claude/claude.json` and includes:

### 1. Playwright Server
- **Purpose**: Browser automation, screenshots, web testing
- **Server**: `@executeautomation/playwright-mcp-server`
- **Default URL**: http://localhost:5200

### 2. Filesystem Server  
- **Purpose**: File access and manipulation
- **Server**: `@modelcontextprotocol/server-filesystem`
- **Access**: Current project directory

## How to Enable MCP in Claude

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Restart Claude Desktop** to load the MCP configuration

3. **Verify MCP is loaded**:
   - Look for the MCP icon (🔌) in the bottom-right of Claude's input box
   - Click it to see available tools

## Available MCP Commands

Once MCP is loaded, Claude can:

### Browser Automation (Playwright)
- `navigate_to`: Open a URL in browser
- `screenshot`: Take a screenshot of the current page
- `click`: Click on elements
- `fill`: Fill in form fields
- `get_page_content`: Get the HTML content
- `execute_js`: Execute JavaScript in the browser

### Example Usage
```
"Use playwright to navigate to http://localhost:5200/en/ and take a screenshot"
"Click on the Spanish language selector"
"Fill in the contact form with test data"
```

## Testing Your Setup

1. Ask Claude: "Can you use playwright to navigate to localhost:5200 and take a screenshot?"
2. If MCP is working, Claude will:
   - Open a visible browser window
   - Navigate to your site
   - Take a screenshot
   - Show you the result

## Troubleshooting

### MCP not showing up?
1. Make sure `.claude/claude.json` exists
2. Fully quit and restart Claude Desktop
3. Check that your dev server is running

### Browser not opening?
1. Ensure Playwright is installed: `npm install playwright`
2. Install browsers: `npx playwright install chromium`

### Connection errors?
1. Check that localhost:5200 is accessible
2. Verify no firewall is blocking the connection

## Benefits

With MCP configured, Claude can:
- ✅ See your website live as changes are made
- ✅ Take screenshots automatically
- ✅ Test user interactions
- ✅ Debug visual issues
- ✅ Verify responsive design
- ✅ Access and modify project files directly

No more manual screenshots needed!