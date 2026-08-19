using System.Net;
using System.Text.Json;

namespace server.Middleware;

/// <summary>
/// Catches unhandled exceptions from downstream middleware/controllers and converts
/// them into a consistent JSON error response instead of leaking a stack trace.
/// </summary>
public sealed class GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception while processing {Method} {Path}", context.Request.Method, context.Request.Path);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var payload = JsonSerializer.Serialize(new
            {
                status = 500,
                message = "An unexpected error occurred. Please try again later."
            });

            await context.Response.WriteAsync(payload);
        }
    }
}
