# GAIA AI — Auto-Update Checking (Optional)

This guide sets up a weekly Perplexity Scheduled Task that automatically checks whether your GAIA AI Space is running the latest version.

---

## Setup Instructions

1. Go to your **GAIA AI Perplexity Space**
2. Click **Scheduled Tasks** in the left sidebar
3. Click **Create Task**
4. In the **Instructions** field, paste the following:

```
Compare the current version of GAIA AI to https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/refs/heads/master/VERSION.
- If the versions are the same, say "GAIA AI is up to date".
- If the versions are different, say "GAIA AI can be updated to [new version from the url]. Update now: [url to the new update instructions page referenced in step 2b, the domain is use-gaia-ai.vercel.app]"
```

5. Set **Schedule** to **Weekly**
6. (Optional) Turn off email notifications if preferred
7. Click **Save**

---

That's it. Every week, GAIA AI will silently check if a newer version exists and notify you only when an update is available.

For full update instructions when an update is available, visit: [https://use-gaia-ai.vercel.app/update](https://use-gaia-ai.vercel.app/update)
