'use client'

import React, { useState } from 'react'
import { EB_Garamond } from 'next/font/google'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Button } from '@/components/ui/button'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
})

type CodeSnippetLanguage = 'javascript' | 'python' | 'java' | 'csharp' | 'php'

const CodeBlock = ({ language, code }: { language: CodeSnippetLanguage; code: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={copyToClipboard}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

const codeSnippets: Record<CodeSnippetLanguage, string> = {
  javascript: `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`,
  python: `import requests
import json

url = "http://localhost:3000/api/v1/events"
headers = {
    "Authorization": "Bearer <YOUR_API_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "category": "sale",
    "fields": {
        "plan": "PRO",
        "email": "zoe.martinez2001@email.com",
        "amount": 49.00
    }
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.status_code, response.text)`,
  java: `import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;

public class EventMonitoring {
    public static void main(String[] args) throws Exception {
        URL url = new URL("http://localhost:3000/api/v1/events");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization", "Bearer <YOUR_API_KEY>");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);

        String jsonInputString = "{\"category\": \"sale\", \"fields\": {\"plan\": \"PRO\", \"email\": \"zoe.martinez2001@email.com\", \"amount\": 49.00}}";
        try (OutputStream os = con.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = con.getResponseCode();
        System.out.println("Response Code: " + responseCode);
    }
}`,
  csharp: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main(string[] args)
    {
        var url = "http://localhost:3000/api/v1/events";
        var json = "{\"category\":\"sale\",\"fields\":{\"plan\":\"PRO\",\"email\":\"zoe.martinez2001@email.com\",\"amount\":49.00}}";
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        client.DefaultRequestHeaders.Add("Authorization", "Bearer <YOUR_API_KEY>");

        var response = await client.PostAsync(url, content);
        string result = await response.Content.ReadAsStringAsync();
        Console.WriteLine(result);
    }
}`,
  php: `<?php

$api_key = '<YOUR_API_KEY>';
$url = 'http://localhost:3000/api/v1/events';

$data = [
    'category' => 'sale',
    'fields' => [
        'plan' => 'PRO',
        'email' => 'zoe.martinez2001@email.com',
        'amount' => 49.00
    ]
];

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n" .
                     "Authorization: Bearer $api_key\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) {
    /* Handle error */
}

echo $result;
?>`
}

export default function Component() {
  const [activeTab, setActiveTab] = useState<CodeSnippetLanguage>('javascript')

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className={`${ebGaramond.className} text-4xl font-bold mb-2`}>PingPanda Documentation</h1>
      <hr className="mb-6 mt-2 border-gray-300" />

      <section className="mb-12">
        <h2 className={`${ebGaramond.className} text-2xl font-semibold mb-4`}>Overview</h2>
        <p className="text-gray-600 mb-4">
          PingPanda is a full-stack SaaS application that provides comprehensive event monitoring capabilities. This documentation will guide you through setting up event monitoring for payment events.
        </p>
      </section>

      <section className="mb-12">
        <h2 className={`${ebGaramond.className} text-2xl font-semibold mb-4`}>Prerequisites</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>An active PingPanda account</li>
          <li>An API key for the event monitoring system</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className={`${ebGaramond.className} text-2xl font-semibold mb-4`}>Setting Up Event Monitoring</h2>

        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className={`${ebGaramond.className} text-xl font-semibold mb-2`}>Step 1: Obtain Your API Key</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Log in to your PingPanda account</li>
              <li>Navigate to the <strong>API Key </strong> section</li>
              <li>Copy it for later use</li>
            </ol>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className={`${ebGaramond.className} text-xl font-semibold mb-2`}>Step 2: Integrate Event Monitoring API</h3>
            <p className="text-gray-600 mb-4">Use the PingPanda event API to send payment data. Below are code snippets in different languages.</p>
            <div className="mb-4">
              <div className="flex space-x-2">
                {Object.keys(codeSnippets).map((lang) => (
                  <button
                    key={lang}
                    className={`px-4 py-2 rounded-t-lg ${
                      activeTab === lang
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(lang as CodeSnippetLanguage)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200">
                <CodeBlock language={activeTab} code={codeSnippets[activeTab]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className={`${ebGaramond.className} text-2xl font-semibold mb-4`}>Testing the Integration</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-600">
          <li>Run your backend server:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>For JavaScript: <code className="bg-gray-100 px-1 py-0.5 rounded">node server.js</code></li>
              <li>For Python: <code className="bg-gray-100 px-1 py-0.5 rounded">python server.py</code></li>
              <li>For Java: 
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li>Compile: <code className="bg-gray-100 px-1 py-0.5 rounded">javac EventMonitoring.java</code></li>
                  <li>Run: <code className="bg-gray-100 px-1 py-0.5 rounded">java EventMonitoring</code></li>
                </ol>
              </li>
              <li>For C#: <code className="bg-gray-100 px-1 py-0.5 rounded">dotnet run</code> (assuming you're using .NET Core)</li>
              <li>For PHP: <code className="bg-gray-100 px-1 py-0.5 rounded">php -S localhost:8000</code> (for a simple development server)</li>
            </ul>
          </li>
          <li>Send a sample event using the code snippet provided for your chosen language</li>
          <li>Verify that the event shows up on your dashboard</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className={`${ebGaramond.className} text-2xl font-semibold mb-4`}>Troubleshooting</h2>
        <div className="space-y-4">
          {[
            { code: "401 Unauthorized", description: "Ensure that your API key is correct and active. This response occurs if there is no authorization header or if the format is incorrect (e.g., missing 'Bearer' keyword)." },
            { code: "422 Unprocessable Entity", description: "Indicates that the request data does not meet the expected format. Check for any missing or incorrect fields in the payload." },
            { code: "400 Bad Request", description: "This occurs when the request body is invalid JSON. Make sure the JSON is properly structured." },
            { code: "403 Forbidden", description: "This response will be returned if the user's Discord ID is not set. Update your account settings to include a Discord ID." },
            { code: "404 Not Found", description: "The specified event category does not exist for the user. Verify that the category name is correct." },
            { code: "429 Too Many Requests", description: "This occurs when the monthly quota for events has been reached. Upgrade the plan to increase the event quota." },
            { code: "500 Internal Server Error", description: "There was an issue on the server while processing the event. Check server logs for more details." },
          ].map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{item.code}</div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={`${ebGaramond.className} text-2xl font-semibold mb-4`}>Conclusion</h2>
        <p className="text-gray-600 mb-4">
          By following the steps above, you should be able to set up an effective event monitoring system for payment notifications. PingPanda's API makes it easy to send event data and view events your dashboard.
        </p>
        <p className="text-gray-600 mb-4">
          If you encounter any issues or need more advanced functionality reach out to support.
        </p>
        <Button >
          Contact Support
        </Button>
      </section>
    </div>
  )
}