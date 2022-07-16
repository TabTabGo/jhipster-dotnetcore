# Entities auditing

JHipster.Net implement basic Auditing on all the entities you save in the database.

## Audit properties

This blueprint introduce a new base class named `AuditedEntityBase` that every generated entity will inherit from when we need to add the audit functionality. The properties use to audit entities are :

1. CreateBy : The user who created the initial entry.
2. CreatedDate : The datetime of creation of initial entry.
3. LastModifiedBy : The user who modified the entry last.
4. LastModifiedDate : The datetime the entry was last modified.

```csharp
public abstract class AuditedEntityBase
{
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime LastModifiedDate { get; set; }
}
```

## Audit of generated Entities

For example, if we have a `Task` entity and we want to add audit functionality we would inherit from our `AuditedEntityBase` like that:

```csharp
public class Task : AuditedEntityBase
{
    public string Title { get; set; }
    public string Description { get; set; }
}
```

Our `Task` class will have all the audit properties.

## Automatically set properties audit

To automatically set the audit properties, we override the `SaveChangesAsync` method in our `ApplicationDatabaseContext` class:

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
{
    var entries = ChangeTracker
        .Entries()
        .Where(e => e.Entity is IEntity && (
            e.State == EntityState.Added
            || e.State == EntityState.Modified));

    string modifiedOrCreatedBy = _httpContextAccessor?.HttpContext?.User?.Identity?.Name ?? "System";

    foreach (var entityEntry in entries)
    {
        if (entityEntry.State == EntityState.Added)
        {
            ((IEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
            ((IEntity)entityEntry.Entity).CreatedBy = modifiedOrCreatedBy;
        }
        else
        {
            Entry((IEntity)entityEntry.Entity).Property(p => p.CreatedDate).IsModified = false;
            Entry((IEntity)entityEntry.Entity).Property(p => p.CreatedBy).IsModified = false;
        }
        ((IEntity)entityEntry.Entity).UpdatedDate = DateTime.Now;
        ((IEntity)entityEntry.Entity).UpdatedBy = modifiedOrCreatedBy;
    }
    return await base.SaveChangesAsync(cancellationToken);
}
```

In our implementation, we use the `HttpContextAccessor` to get the `user name` of current user. To have `HttpContextAccessor` available we just inject it into our `ApplicationDatabaseContext class`.

```csharp
private readonly IHttpContextAccessor _httpContextAccessor;
public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
{
    _httpContextAccessor = httpContextAccessor;
}
```
